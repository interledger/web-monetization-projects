.class Landroidx/appcompat/app/G;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/I;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/I;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/I;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/G;->a:Landroidx/appcompat/app/I;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    return-void
.end method


# virtual methods
.method public b(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/G;->a:Landroidx/appcompat/app/I;

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/appcompat/app/I;->B:La/a/c/i;

    iget-object p1, p1, Landroidx/appcompat/app/I;->h:Landroidx/appcompat/widget/ActionBarContainer;

    invoke-virtual {p1}, Landroid/widget/FrameLayout;->requestLayout()V

    return-void
.end method
