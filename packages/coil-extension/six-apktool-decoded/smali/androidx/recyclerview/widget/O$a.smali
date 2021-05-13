.class Landroidx/recyclerview/widget/O$a;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/O;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = "a"
.end annotation


# static fields
.field static a:La/g/h/d;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/g/h/d<",
            "Landroidx/recyclerview/widget/O$a;",
            ">;"
        }
    .end annotation
.end field


# instance fields
.field b:I

.field c:Landroidx/recyclerview/widget/D$e$c;

.field d:Landroidx/recyclerview/widget/D$e$c;


# direct methods
.method static constructor <clinit>()V
    .locals 2

    new-instance v0, La/g/h/e;

    const/16 v1, 0x14

    invoke-direct {v0, v1}, La/g/h/e;-><init>(I)V

    sput-object v0, Landroidx/recyclerview/widget/O$a;->a:La/g/h/d;

    return-void
.end method

.method private constructor <init>()V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method static a()V
    .locals 1

    :goto_0
    sget-object v0, Landroidx/recyclerview/widget/O$a;->a:La/g/h/d;

    invoke-interface {v0}, La/g/h/d;->a()Ljava/lang/Object;

    move-result-object v0

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    return-void
.end method

.method static a(Landroidx/recyclerview/widget/O$a;)V
    .locals 1

    const/4 v0, 0x0

    iput v0, p0, Landroidx/recyclerview/widget/O$a;->b:I

    const/4 v0, 0x0

    iput-object v0, p0, Landroidx/recyclerview/widget/O$a;->c:Landroidx/recyclerview/widget/D$e$c;

    iput-object v0, p0, Landroidx/recyclerview/widget/O$a;->d:Landroidx/recyclerview/widget/D$e$c;

    sget-object v0, Landroidx/recyclerview/widget/O$a;->a:La/g/h/d;

    invoke-interface {v0, p0}, La/g/h/d;->a(Ljava/lang/Object;)Z

    return-void
.end method

.method static b()Landroidx/recyclerview/widget/O$a;
    .locals 1

    sget-object v0, Landroidx/recyclerview/widget/O$a;->a:La/g/h/d;

    invoke-interface {v0}, La/g/h/d;->a()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/O$a;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/recyclerview/widget/O$a;

    invoke-direct {v0}, Landroidx/recyclerview/widget/O$a;-><init>()V

    :cond_0
    return-object v0
.end method
