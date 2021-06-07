.class public Lb/a/a/a/c/f$c;
.super Landroid/util/Property;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lb/a/a/a/c/f;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "c"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Landroid/util/Property<",
        "Lb/a/a/a/c/f;",
        "Ljava/lang/Integer;",
        ">;"
    }
.end annotation


# static fields
.field public static final a:Landroid/util/Property;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/util/Property<",
            "Lb/a/a/a/c/f;",
            "Ljava/lang/Integer;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method static constructor <clinit>()V
    .locals 2

    new-instance v0, Lb/a/a/a/c/f$c;

    const-string v1, "circularRevealScrimColor"

    invoke-direct {v0, v1}, Lb/a/a/a/c/f$c;-><init>(Ljava/lang/String;)V

    sput-object v0, Lb/a/a/a/c/f$c;->a:Landroid/util/Property;

    return-void
.end method

.method private constructor <init>(Ljava/lang/String;)V
    .locals 1

    const-class v0, Ljava/lang/Integer;

    invoke-direct {p0, v0, p1}, Landroid/util/Property;-><init>(Ljava/lang/Class;Ljava/lang/String;)V

    return-void
.end method


# virtual methods
.method public a(Lb/a/a/a/c/f;)Ljava/lang/Integer;
    .locals 0

    invoke-interface {p1}, Lb/a/a/a/c/f;->getCircularRevealScrimColor()I

    move-result p1

    invoke-static {p1}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object p1

    return-object p1
.end method

.method public a(Lb/a/a/a/c/f;Ljava/lang/Integer;)V
    .locals 0

    invoke-virtual {p2}, Ljava/lang/Integer;->intValue()I

    move-result p2

    invoke-interface {p1, p2}, Lb/a/a/a/c/f;->setCircularRevealScrimColor(I)V

    return-void
.end method

.method public bridge synthetic get(Ljava/lang/Object;)Ljava/lang/Object;
    .locals 0

    check-cast p1, Lb/a/a/a/c/f;

    invoke-virtual {p0, p1}, Lb/a/a/a/c/f$c;->a(Lb/a/a/a/c/f;)Ljava/lang/Integer;

    move-result-object p1

    return-object p1
.end method

.method public bridge synthetic set(Ljava/lang/Object;Ljava/lang/Object;)V
    .locals 0

    check-cast p1, Lb/a/a/a/c/f;

    check-cast p2, Ljava/lang/Integer;

    invoke-virtual {p0, p1, p2}, Lb/a/a/a/c/f$c;->a(Lb/a/a/a/c/f;Ljava/lang/Integer;)V

    return-void
.end method
