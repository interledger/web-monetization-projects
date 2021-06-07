.class Landroidx/appcompat/app/A;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/i/d$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/B;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/B;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/B;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/A;->a:Landroidx/appcompat/app/B;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/KeyEvent;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/A;->a:Landroidx/appcompat/app/B;

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/B;->a(Landroid/view/KeyEvent;)Z

    move-result p1

    return p1
.end method
