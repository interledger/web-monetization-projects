.class Landroidx/appcompat/app/u;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/v;->run()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/v;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/v;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/u;->a:Landroidx/appcompat/app/v;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    return-void
.end method


# virtual methods
.method public b(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/u;->a:Landroidx/appcompat/app/v;

    iget-object p1, p1, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/high16 v0, 0x3f800000    # 1.0f

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->setAlpha(F)V

    iget-object p1, p0, Landroidx/appcompat/app/u;->a:Landroidx/appcompat/app/v;

    iget-object p1, p1, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    iget-object p1, p0, Landroidx/appcompat/app/u;->a:Landroidx/appcompat/app/v;

    iget-object p1, p1, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iput-object v0, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    return-void
.end method

.method public c(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/u;->a:Landroidx/appcompat/app/v;

    iget-object p1, p1, Landroidx/appcompat/app/v;->a:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroidx/appcompat/widget/ActionBarContextView;->setVisibility(I)V

    return-void
.end method
